import { createData } from "./TableMethods";

const headCells = [
    {
        id: 'rate',
        numeric: false,
        disablePadding: true,
        label: 'Rate',
        width: 70,
    },
    {
        id: 'number',
        numeric: true,
        disablePadding: false,
        label: 'Number',
    },
    {
        id: 'devision',
        numeric: false,
        disablePadding: false,
        label: 'Devision',
    },
    {
        id: 'deviceId',
        numeric: false,
        disablePadding: false,
        label: 'Deivice ID',
    },
    {
        id: 'fileName',
        numeric: false,
        disablePadding: false,
        label: 'File Name',
    },
    {
        id: 'fileSize',
        numeric: false,
        disablePadding: false,
        label: 'File Size',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
];

const radioLabels = [
    { name: 'all' },
    { name: 'normal' },
    { name: 'error' }

]

const ratelabels = [
    { name: 'all' },
    { name: 'low' },
    { name: 'high' }
]

const rows = [
    createData(305, 'high', 'XXXXXX_122222', '1232AAAAZZZZZ', 'AAAAAAAAAAAAA', '40 x 32 cm (12 x 20 inch)', '2022-01-03 12:00'),
    createData(303, 'high', 'XXXXXX_122222', '1232AAAAZZZZZ', 'AAAAAAAAAAAAA', '40 x 32 cm (12 x 20 inch)', '2022-01-03 12:00')
];

export { headCells, rows, radioLabels, ratelabels };