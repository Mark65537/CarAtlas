import React, { useState } from "react";
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

  return (
    <div style={{ marginTop: 12, border: "1px solid #ddd", padding: 12 }}>
      <div>
        <label>Model</label>
        <input value={model} onChange={e => setModel(e.target.value)} />
      </div>
      <div>
        <label>Mark</label>
        <input value={mark} onChange={e => setMark(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onSave({ Id_Car: (initial as any).Id_Car, Model: model, Mark: mark })}>Save</button>
        <button onClick={onCancel}>Cancel</button>
        {initial && (initial as any).Id_Car && <button onClick={() => onDelete((initial as any).Id_Car)}>Delete</button>}
      </div>
    </div>
  );
}
