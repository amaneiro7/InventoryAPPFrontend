import React from "react";
import "./BalanceTable.css";

export default function BalanceTable({ data }) {
let brandCount = [];
let modelsCount = [];
  data.item.forEach((elem) => {
    let brand = elem.brand.name;
    let model = brand + " / " + elem.model.name;
    brandCount[brand] = (brandCount[brand] || 0) + 1;
    modelsCount[model] = (modelsCount[model] || 0) + 1;
  });

  return (
      <table className="Balance__table">
        <thead>
          <tr>
            <th colSpan={2}>{data.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Marca / Modelo</th>
            <th>Cantidad</th>
          </tr>
          {Object.entries(modelsCount).map((count, index) => {
            return (
              <tr key={index}>
                <td>{count[0]}</td>
                <td>{count[1]}</td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <td>Total</td>
          <td>{data.item.length}</td>
        </tfoot>
      </table>
  );
}
