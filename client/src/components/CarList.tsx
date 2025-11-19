import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { DataGrid } from "devextreme-react/data-grid";
import { Column } from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import LoadPanel from "devextreme-react/load-panel";
import Popup from "devextreme-react/popup";
import CarForm from "./CarForm";

const GET_CARS = gql`query GetCars { cars { Id_Car Model Mark } }`;
const CREATE_CAR = gql`mutation Create($input: CarInput!) { createCar(input: $input) { Id_Car Model Mark } }`;
const UPDATE_CAR = gql`mutation Update($id:Int!,$input:CarInput!){ updateCar(id:$id,input:$input){ Id_Car Model Mark } }`;
const DELETE_CAR = gql`mutation Delete($id:Int!){ deleteCar(id:$id) }`;

export default function CarList() {
  const { data, loading, error, refetch } = useQuery(GET_CARS);
  const [createCar] = useMutation(CREATE_CAR);
  const [updateCar] = useMutation(UPDATE_CAR);
  const [deleteCar] = useMutation(DELETE_CAR);
  const [editing, setEditing] = useState<null | any>(null);
  const [errorVisible, setErrorVisible] = useState(false);

  const rows = data?.cars ?? [];

  useEffect(() => {
    if (error) {
      setErrorVisible(true);
    }
  }, [error]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <LoadPanel visible={loading} message="Загрузка..." showIndicator={true} showPane={true} />
      
      <Popup
        visible={errorVisible && !!error}
        onHiding={() => setErrorVisible(false)}
        showTitle={true}
        title="Ошибка"
        width={400}
        height={200}
      >
        <div style={{ padding: "20px" }}>
          {error?.message || "Произошла ошибка"}
        </div>
      </Popup>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Button
          text="Добавить автомобиль"
          type="default"
          stylingMode="contained"
          onClick={() => setEditing({})}
          icon="plus"
        />
      </div>

      <DataGrid
        dataSource={rows}
        keyExpr="Id_Car"
        showBorders={true}
        showColumnLines={true}
        showRowLines={true}
        height={500}
        onRowDblClick={(e) => setEditing(e.data)}
        hoverStateEnabled={true}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
        noDataText="Нет данных для отображения"
        wordWrapEnabled={true}
      >
        <Column dataField="Id_Car" caption="ID" width={70} />
        <Column dataField="Model" caption="Модель" />
        <Column dataField="Mark" caption="Марка" />
      </DataGrid>

      <div style={{ 
        marginTop: "20px", 
        padding: "10px", 
        textAlign: "center", 
        fontSize: "14px",
        color: "#666"
      }}>
        💡 Дважды кликните на строку для редактирования
      </div>

      {editing !== null && (
        <CarForm
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={async (payload) => {
            if (payload.Id_Car) {
              await updateCar({
                variables: {
                  id: payload.Id_Car,
                  input: {
                    Model: payload.Model,
                    Mark: payload.Mark,
                  },
                },
              });
            } else {
              await createCar({
                variables: {
                  input: {
                    Model: payload.Model,
                    Mark: payload.Mark,
                  },
                },
              });
            }

            setEditing(null);
            refetch();
          }}
          onDelete={async (id) => {
            await deleteCar({ variables: { id } });
            setEditing(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}
