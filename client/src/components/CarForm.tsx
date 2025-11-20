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
  const [modelError, setModelError] = useState<string | null>(null);
  const [markError, setMarkError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const isEdit = typeof initial.Id_Car === "number";
  const MAX_LENGTH = 100;
  const isModelValid = model.trim().length > 0 && model.trim().length <= MAX_LENGTH;
  const isMarkValid = mark.trim().length > 0 && mark.trim().length <= MAX_LENGTH;
  const isFormValid = isModelValid && isMarkValid;

  const validateField = (value: string, label: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return `Укажите ${label}`;
    }
    if (trimmed.length > MAX_LENGTH) {
      return `${label} не должна превышать ${MAX_LENGTH} символов`;
    }
    return null;
  };

  const handleSave = async () => {
    const trimmedModel = model.trim();
    const trimmedMark = mark.trim();
    const nextModelError = validateField(model, "модель");
    const nextMarkError = validateField(mark, "марку");

    setModelError(nextModelError);
    setMarkError(nextMarkError);

    if (nextModelError || nextMarkError) {
      setFormError("Заполните обязательные поля.");
      return;
    }

    setFormError(null);
    setIsPending(true);
    try {
      await onSave({
        Id_Car: initial.Id_Car,
        Model: trimmedModel,
        Mark: trimmedMark,
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    if (!initial.Id_Car) {
      return;
    }
    setConfirmVisible(false);
    setIsPending(true);
    try {
      await onDelete(initial.Id_Car);
    } finally {
      setIsPending(false);
    }
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    const trimmed = value.trim();
    if (trimmed.length > MAX_LENGTH) {
      setModelError(`Модель не должна превышать ${MAX_LENGTH} символов`);
      return;
    }
    if (modelError && trimmed.length > 0 && trimmed.length <= MAX_LENGTH) {
      setModelError(null);
    }
  };

  const handleMarkChange = (value: string) => {
    setMark(value);
    const trimmed = value.trim();
    if (trimmed.length > MAX_LENGTH) {
      setMarkError(`Марка не должна превышать ${MAX_LENGTH} символов`);
      return;
    }
    if (markError && trimmed.length > 0 && trimmed.length <= MAX_LENGTH) {
      setMarkError(null);
    }
  };

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
    >
      <div style={{ padding: "20px" }}>
        <Form>
          <Item>
            <TextBox
              label="Модель"
              value={model}
              labelMode="floating"
              onValueChange={handleModelChange}
              placeholder="Введите модель автомобиля"
            />
            {modelError && (
              <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                {modelError}
              </div>
            )}
          </Item>

          <Item>
            <TextBox
              label="Марка"
              value={mark}
              labelMode="floating"
              onValueChange={handleMarkChange}
              placeholder="Введите марку автомобиля"
            />
            {markError && (
              <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                {markError}
              </div>
            )}
          </Item>
        </Form>

        <div style={{ 
          marginTop: "20px", 
          display: "flex", 
          gap: "10px", 
          flexWrap: "wrap" 
        }}>
          <Button
            text="Сохранить"
            type="default"
            stylingMode="contained"
            disabled={!isFormValid || isPending}
            onClick={handleSave}
            icon="save"
          />

          <Button
            text="Отмена"
            stylingMode="outlined"
            onClick={isPending ? undefined : onCancel}
            disabled={isPending}
            icon="close"
          />

          {isEdit && (
            <Button
              text="Удалить"
              type="danger"
              stylingMode="contained"
              onClick={() => setConfirmVisible(true)}
              disabled={isPending}
              icon="trash"
            />
          )}
        </div>
        {formError && (
          <div style={{ color: "#d32f2f", fontSize: "13px", marginTop: "12px" }}>
            {formError}
          </div>
        )}
      </div>

      <Popup
        visible={confirmVisible}
        onHiding={() => (isPending ? null : setConfirmVisible(false))}
        showCloseButton={!isPending}
        dragEnabled={!isPending}
        hideOnOutsideClick={!isPending}
        width={360}
        height={220}
        title="Подтвердите удаление"
      >
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>Вы действительно хотите удалить этот автомобиль?</div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <Button
              text="Отмена"
              stylingMode="outlined"
              onClick={() => setConfirmVisible(false)}
              disabled={isPending}
              icon="close"
            />
            <Button
              text="Удалить"
              type="danger"
              stylingMode="contained"
              onClick={handleDelete}
              disabled={isPending}
              icon="trash"
            />
          </div>
        </div>
      </Popup>
    </Popup>
  );
}
