import { useState } from 'react'

import { Form } from '@douyinfe/semi-ui'
import { defineFieldSetup, useFormSetup } from './form'

const Username = defineFieldSetup(({ field, form, defineComponent, defineProps, onChange, onValidate, watch }) => {
  const componentRef = defineComponent(() => Form.Input)
  const propsProxy = defineProps(() => {
    return { defaultValue: 'default name' }
  })

  // name field change
  onChange((value) => {})

  // name field validate
  onValidate(() => {})

  // any fields change in form
  watch((values, preValues) => {})

  // only watch name field
  watch(['age'], ([age], [preAge]) => {})

  // only watch name field
  watch(
    () => ['age'],
    ([age], [preAge]) => {},
  )
})

const Password = defineFieldSetup(({ field, form, defineComponent, defineProps, onChange, onValidate, watch }) => {
  const componentRef = defineComponent(() => Form.Input)
  const propsProxy = defineProps(() => {
    return { defaultValue: 'default name' }
  })

  // name field change
  onChange((value) => {})

  // name field validate
  onValidate(() => {})

  // any fields change in form
  watch((values, preValues) => {})

  // only watch name field
  watch(['age'], ([age], [preAge]) => {})

  // only watch name field
  watch(
    () => ['age'],
    ([age], [preAge]) => {},
  )
})

function App() {
  useFormSetup(() => ({ Username, Password }))

  return (
    <>
      <h1>1</h1>
      <Form layout="horizontal" onValueChange={(values) => console.log(values)}>
        <Form.Input field="UserName" label="用户名" style={{ width: 80 }} />
        <Form.Input field="Password" label={{ text: '密码' }} style={{ width: 176 }} />
        <Form.Select
          field="Role"
          label={{ text: '角色', optional: true }}
          optionList={[
            { label: '管理员', value: 'admin' },
            { label: '普通用户', value: 'user' },
          ]}
          style={{ width: 176 }}
        ></Form.Select>
      </Form>
    </>
  )
}

export default App
