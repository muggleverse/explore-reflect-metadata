import { ComponentType } from 'react'

export const enum HOOKS {
  onChange,
  onValidate,
  watch,
  defineComponent,
  defineProps,
}

const foo = () => {}

const safelyCacheCallback = (map, key, callback) => {
  if (!callback) {
    return // do nothing
  }

  if (map.has(key)) {
    map.get(key).push(callback)
  } else {
    map.set(key, [callback])
  }
}

const safelyInvokeCallbackAsync = (map, key, args) => {
  if (!map.has(key)) {
    return // do nothing
  }

  return Promise.all(map.get(key).map((callback) => callback(...args)))
}

type DefineComponent<C> = (Comp: C) => any
type DefineProps<P> = (callback: () => P) => any

export type Setup<P extends any> = (p: {
  field
  form
  defineComponent: DefineComponent<ComponentType<P>>
  defineProps: DefineProps<P>
  onChange
  onValidate
  watch
}) => any

export function defineFieldSetup(setup) {
  const cached = new Map()

  let Comp

  const props = {}
  const propsProxy = new Proxy(props, {
    set(target, key, value) {},
  })

  const defineComponent = (callback) => {
    safelyCacheCallback(cached, HOOKS.defineComponent, callback)
  }

  const defineProps = (callback) => {
    safelyCacheCallback(cached, HOOKS.defineProps, callback)
  }

  /** current field change */
  const onChange = (callback) => safelyCacheCallback(cached, HOOKS.onChange, callback)

  /** current field validate */
  const onValidate = (callback) => {
    safelyCacheCallback(cached, HOOKS.onValidate, callback)
  }

  const watch = (callback) => {
    safelyCacheCallback(cached, HOOKS.watch, callback)
  }

  const hooks = { defineComponent, defineProps, onChange, onValidate, watch }

  return function ({ field, form }) {
    setup({ field, form, ...hooks })

    Comp = cached.get(HOOKS.defineComponent)?.pop()?.()

    if (!Comp) {
      throw new Error('Comp is undefined')
    }

    const onChange = async (...args) => {
      const nextProps = await safelyInvokeCallbackAsync(cached, HOOKS.onChange, args)
    }

    const onValidate = async (...args) => {
      await safelyInvokeCallbackAsync(cached, HOOKS.onValidate, args)
    }

    const watch = async (...args) => {
      await safelyInvokeCallbackAsync(cached, HOOKS.watch, args)
    }

    function FieldWrapper(props) {
      return <Comp />
    }

    FieldWrapper.displayName = `FieldWrapper(${field})(${Comp.displayName || Comp.name || 'C'})`
  }
}

export const useFormSetup = (fields: () => Record<string, ReturnType<typeof defineFieldSetup>>) => {
  Object.entries(fields()).map(([field, setup]) => {
    setup({ field, form })
  })
}
