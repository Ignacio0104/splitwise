export interface userHeaderProps {}

export const mockReport = {
  id: "341414",
  users: [
    {
      name: "reporte de prueba",
      contributions: [
        {
          userId: "1111",
          name: "Nacho",
          description: "Pago alquiler",
          amount: 5000,
          date: "2025-12-12",
        },
      ],
    },
  ],
  total: 25,
  percentages: [
    {
      userId: "1222",
      name: "Anto",
      percentage: 50,
    },
    {
      userId: "1555",
      name: "Nacho",
      percentage: 50,
    },
  ],
};
