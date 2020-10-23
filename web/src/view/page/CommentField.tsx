import * as React from 'react'

/* The available editors for the field */
type Editor = 'textbox' | 'multilinetextbox' | 'dropdown'

export interface IFieldProps {
  /* The unique field name */
  id: string

  /* The label text for the field */
  label?: string

  /* The editor for the field */
  editor?: Editor

  /* The drop down items for the field */
  options?: string[]

  /* The field value */
  value?: any
}

interface labelStyle {
  fontSize: number
}

interface commentBox {
  outline: string
  width: string
  borderRadius: string
  opacity: number
}

const labelStyle: labelStyle = {
  fontSize: 10,
}

const boxStyle: commentBox = {
  outline: 'none',
  width: '40%',
  borderRadius: '25px',
  opacity: 1,
}

export const Field: React.SFC<IFieldProps> = ({ id, label, editor, options, value }) => {
  return (
    <div className="field-group pa2 bg-washed-blue">
      {editor!.toLowerCase() === 'textbox' && (
        <>
          <div style={labelStyle}>{label && <label htmlFor={id}>{label}</label>}</div>
          <input
            id={id}
            type="text"
            value={value}
            onChange={(e: React.FormEvent<HTMLInputElement>) => console.log(e) /* TODO: push change to form values */}
            onBlur={(e: React.FormEvent<HTMLInputElement>) => console.log(e) /* TODO: validate field value */}
            className="form-control"
          />
        </>
      )}

      {editor!.toLowerCase() === 'multilinetextbox' && (
        <>
          <div style={labelStyle}>{label && <label htmlFor={id}>{label}</label>}</div>
          <div className="pa2 bg-washed-blue">
            <textarea
              style={boxStyle}
              id={id}
              value={value}
              onChange={
                (e: React.FormEvent<HTMLTextAreaElement>) => console.log(e) /* TODO: push change to form values */
              }
              onBlur={(e: React.FormEvent<HTMLTextAreaElement>) => console.log(e) /* TODO: validate field value */}
              className="form-control"
            />
          </div>
        </>
      )}

      {editor!.toLowerCase() === 'dropdown' && (
        <>
          <div>{label && <label htmlFor={id}>{label}</label>}</div>
          <select
            id={id}
            name={id}
            value={value}
            onChange={(e: React.FormEvent<HTMLSelectElement>) => console.log(e) /* TODO: push change to form values */}
            onBlur={(e: React.FormEvent<HTMLSelectElement>) => console.log(e) /* TODO: validate field value */}
            className="form-control"
          >
            {options &&
              options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </>
      )}

      {/* TODO - display validation error */}
    </div>
  )
}
Field.defaultProps = {
  editor: 'textbox',
}
