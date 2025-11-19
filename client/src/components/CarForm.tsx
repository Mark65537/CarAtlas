import React, { useState } from "react";
import Popup from "devextreme-react/popup";
import Form, { Item } from "devextreme-react/form";
import TextBox from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import { Car } from "../types";

type Props = {
  initial: Partial<Car>;
  onSave: (c: Partial<Car>) => Promise<void>;
  onCancel: () => void;
  onDelete: (id?: number) => Promise<void>;
};

export default function CarForm({ initial, onSave, onCancel, onDelete }: Props) {
  const [model, setModel] = useState(initial.Model ?? "");
  const [mark, setMark] = useState(initial.Mark ?? "");
  const isEdit = typeof initial.Id_Car === "number";

  return (
    <Popup
      visible={true}
      onHiding={onCancel}
      dragEnabled={true}
      hideOnOutsideClick={true}
      width={400}
      height={320}
      title={isEdit ? "Редактирование автомобиля" : "Добавление автомобиля"}
      showCloseButton={true}
    >
      <div style={{ padding: 15 }}>
        <Form>
          <Item>
            <TextBox
              label="Модель"
              value={model}
              labelMode="floating"
              onValueChange={(v) => setModel(v)}
            />
          </Item>

          <Item>
            <TextBox
              label="Марка"
              value={mark}
              labelMode="floating"
              onValueChange={(v) => setMark(v)}
            />
          </Item>
        </Form>

        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <Button
            text="Сохранить"
            type="default"
            stylingMode="contained"
            onClick={() =>
              onSave({
                Id_Car: initial.Id_Car,
                Model: model,
                Mark: mark,
              })
            }
          />

          <Button
            text="Отмена"
            stylingMode="outlined"
            onClick={onCancel}
          />

          {isEdit && (
            <Button
              text="Удалить"
              type="danger"
              stylingMode="contained"
              onClick={() => onDelete(initial.Id_Car)}
            />
          )}
        </div>
      </div>
    </Popup>
  );
}
