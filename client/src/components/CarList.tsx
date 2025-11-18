import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { DataGrid } from "devextreme-react/data-grid";
import { Column } from "devextreme-react/data-grid";
import CarForm from "./CarForm";

const GET_CARS = gql`
  query GetCars { cars { Id_Car Model Mark } }
`;
const CREATE_CAR = gql`mutation Create($input: CarInput!) { createCar(input: $input) { Id_Car Model Mark } }`;
const UPDATE_CAR = gql`mutation Update($id:Int!,$input:CarInput!){ updateCar(id:$id,input:$input){ Id_Car Model Mark } }`;
const DELETE_CAR = gql`mutation Delete($id:Int!){ deleteCar(id:$id) }`;

export default function CarList() {
  const { data, loading, error, refetch } = useQuery(GET_CARS);
  const [createCar] = useMutation(CREATE_CAR);
  const [updateCar] = useMutation(UPDATE_CAR);
  const [deleteCar] = useMutation(DELETE_CAR);
  const [editing, setEditing] = useState<any | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const rows = data?.cars ?? [];

  return (
    <div>
      <button onClick={() => setEditing({})}>Add car</button>
      <DataGrid dataSource={rows} keyExpr="Id_Car" showBorders={true} height={400}>
        <Column dataField="Id_Car" caption="ID" />
        <Column dataField="Model" caption="Model" />
        <Column dataField="Mark" caption="Mark" />
      </DataGrid>

      {editing !== null && (
        <CarForm
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={async (payload: any) => {
            if (payload.Id_Car) {
              await updateCar({ variables: { id: payload.Id_Car, input: { Model: payload.Model, Mark: payload.Mark } } });
            } else {
              await createCar({ variables: { input: { Model: payload.Model, Mark: payload.Mark } } });
            }
            setEditing(null);
            refetch();
          }}
          onDelete={async (id?: number) => {
            if (!id) return;
            await deleteCar({ variables: { id } });
            setEditing(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}
