'use client';
import * as React from 'react';
import Box from '@mui/material/Box';

import PageContainer from '@/components/container/PageContainer';
import DashboardCard from '@/components/shared/DashboardCard';
import BasicTable, { HeadCell } from '@/components/table/basic-table';

interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(id: number, name: string, calories: number, fat: number, carbs: number, protein: number): Data {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

const pageHeader = {
  title: '品項管理',
  description: '使用者列表',
  // subtitle: '品項管理1',
  // action: '品項管理2',
  // footer: <div>品項管理3</div>,
  // cardheading: '品項管理4',
  // headtitle: '品項管理5',
  // headsubtitle: '品項管理6',
  // middlecontent: '品項管理7',
};

export default function Page() {
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  return (
    <PageContainer title={pageHeader.title} description={pageHeader.description}>
      <DashboardCard {...pageHeader}>
        <Box sx={{ width: '100%' }}>
          <BasicTable
            title="使用者列表"
            columns={headCells}
            data={rows}
            onRowClick={(e, row) => {
              console.log(row);
            }}
          />
          <BasicTable
            title="Checkbox使用者列表"
            columns={headCells}
            data={rows}
            checkable={true}
            value={selected}
            onChange={(value) => {
              setSelected(value);
            }}
            onRowClick={(e, row) => {
              console.log(row);
            }}
          />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}
