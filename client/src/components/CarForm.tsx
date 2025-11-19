import React, { useState } from "react";
import Popup from "devextreme-react/popup";
import Form, { Item } from "devextreme-react/form";
import TextBox from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import { Car } from "../types";
import "./CarForm.css";

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
      width={450}
      height={350}
      title={isEdit ? "✏️ Редактирование автомобиля" : "➕ Добавление автомобиля"}
      showCloseButton={true}
      className="car-form-popup"
    >
      <div className="car-form-content">
        <Form>
          <Item>
            <TextBox
              label="Модель"
              value={model}
              labelMode="floating"
              onValueChange={(v) => setModel(v)}
              placeholder="Введите модель автомобиля"
            />
          </Item>

          <Item>
            <TextBox
              label="Марка"
              value={mark}
              labelMode="floating"
              onValueChange={(v) => setMark(v)}
              placeholder="Введите марку автомобиля"
            />
          </Item>
        </Form>

        <div className="car-form-buttons">
          <Button
            text="💾 Сохранить"
            type="default"
            stylingMode="contained"
            onClick={() =>
              onSave({
                Id_Car: initial.Id_Car,
                Model: model,
                Mark: mark,
              })
            }
            className="save-button"
          />

          <Button
            text="Отмена"
            stylingMode="outlined"
            onClick={onCancel}
          />

          {isEdit && (
            <Button
              text="🗑️ Удалить"
              type="danger"
              stylingMode="contained"
              onClick={() => onDelete(initial.Id_Car)}
              className="delete-button"
            />
          )}
        </div>
      </div>
    </Popup>
  );
}
