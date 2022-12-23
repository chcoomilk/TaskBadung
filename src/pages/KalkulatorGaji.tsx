import { createSignal } from "solid-js";
import KalkulatorGajiNewEmployeeInputGroup from "./KalkulatorGaji/NewEmployee";
import { Employee, Nationality } from "./KalkulatorGaji/types";

const IncomeCalculator = () => {
  const [getEmployees, setEmployees] = createSignal<Employee[]>([], { equals: false });

  const penghasilanNett = (bruto: number, nationality: Nationality, status_pernikahan: boolean, anak: boolean) => {
    let result = (bruto * 12);
    let imbas: number = 0;
    if (nationality === Nationality.Indonesian) {
      imbas = 25000000;
      if (status_pernikahan) imbas += imbas;
      if (anak) imbas += imbas;
    } else if (nationality === Nationality.Vietnamese) {
      imbas = 15000000;
      if (status_pernikahan) imbas *= 2;
      imbas += 12000000;
    }
    return result - imbas;
  };

  // total pajak setahun = 2.5+32.25 = 37.75 juta // pantes boke terus
  // total pajak bulan ini = 37.75 / 12 = 3.146 juta
  // rumus 50 x 5%, 50 muncul dari mana
  // ga bisa itung pajak
  const pajakPenghasilan = (nett: number, nationality: Nationality) => {
    let imbas = nationality === Nationality.Indonesian ? 5 / 100 : 2.5 / 100;
    if (nationality === Nationality.Indonesian) {
      if (nett > 50000000) imbas += 5 / 100;
      if (nett > 250000000) imbas += 5 / 100;
    } else {
      if (nett > 50000000) imbas += 5.0 / 100;
    }
    return nett - (nett * imbas);
  };

  const newEmployee = ({
    name,
    anak,
    nationality,
    penghasilan: {
      bruto,
    },
    status_pernikahan
  }: Employee) => setEmployees(prev => {
    const nett = penghasilanNett(bruto, nationality, status_pernikahan, !!anak);
    const pajak = pajakPenghasilan(nett, nationality);
    prev.push({
      name,
      anak,
      nationality,
      penghasilan: {
        bruto,
        nett,
        pajak,
        asuransi: nationality === Nationality.Vietnamese ? 12000000 : undefined,
      },
      status_pernikahan,
    });
    return prev;
  });

  return (
    <div>
      <p>
        Penggajian
      </p>
      <div>
        <KalkulatorGajiNewEmployeeInputGroup onAdd={(employee) => newEmployee(employee)} />
      </div>

      <h1>Employee List</h1>
      <table style={{ width: "100%", border: "1px solid white", }}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Status Pernikahan</th>
            <th>Nationality</th>
            <th>Penghasilan Bruto</th>
            <th>Penghasilan Nett</th>
            <th>Tunjangan Asuransi</th>
          </tr>
        </thead>
        <tbody>
          {
            getEmployees().map((employee) => (
              <tr>
                <td>{employee.name}</td>
                <td>{String(employee.status_pernikahan)}</td>
                <td>{employee.nationality}</td>
                <td>{employee.penghasilan.bruto}</td>
                <td>{employee.penghasilan.nett}</td>
                <td>{employee.penghasilan.asuransi}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default IncomeCalculator;
