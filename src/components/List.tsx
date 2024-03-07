import { ReactNode } from "react";

interface Props{
  fields:Object,
  children: ReactNode
}
export function List({fields, children }:Props){
  return (
    <table className="flex justify-center">
      <thead className="text-left">
        <tr className="border-b">
          {Object.values(fields).map(head => {
            return (
              <th key={head}>
                {head}
              </th>
            )
          })}
        </tr>
      </thead>
    </table>
  )
}