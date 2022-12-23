import { Component, createSignal } from "solid-js";
import { Employee, Nationality } from "./types";

type Props = {
  onAdd?: (data: Employee) => {}
}

const KalkulatorGajiNewEmployeeInputGroup: Component<Props> = ({ onAdd }) => {
  const [employee, setEmployee] = createSignal<Employee>({
    name: "",
    anak: 0,
    nationality: Nationality.Indonesian,
    penghasilan: {
      bruto: 0,
      nett: 0,
    },
    status_pernikahan: false
  }, { equals: false });

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    onAdd && onAdd(employee());
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label>Name</label> <input
          value={employee().name}
          type="text"
          placeholder="nama"
          onInput={(e) => setEmployee(p => ({ ...p, name: e.currentTarget.value || "" }))}
        />
      </div>
      <div>
        <label>Status Pernikahan</label>
        <input
          type="checkbox"
          checked={employee().status_pernikahan}
          onInput={(e) => setEmployee(p => ({ ...p, status_pernikahan: e.currentTarget.checked }))}
        />
      </div>
      <div>
        <label>Anak</label> <input
          value={employee().anak}
          type="number"
          placeholder="anak"
          onInput={(e) => setEmployee(p => ({ ...p, anak: e.currentTarget.valueAsNumber }))}
        />
      </div>
      <div>
        <label>Nationality</label> <select
          onInput={(e) => setEmployee(
            p => ({ ...p, nationality: (e.currentTarget.value as Nationality) })
          )}
        >
          <option value={Nationality.Indonesian}>{Nationality.Indonesian}</option>
          <option value={Nationality.Vietnamese}>{Nationality.Vietnamese}</option>
        </select>
      </div>
      <div>
        <label>Penghasilan Bruto</label> <input
          value={employee().penghasilan.bruto}
          type="number"
          placeholder="bruto"
          onInput={(e) => setEmployee(p => ({ ...p, penghasilan: { ...p.penghasilan, bruto: e.currentTarget.valueAsNumber } }))}
        />
      </div>
      <div>
        <button type="submit">
          +add
        </button>
      </div>
    </form>
  );
};

export default KalkulatorGajiNewEmployeeInputGroup;
