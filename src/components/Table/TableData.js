import RateInput from '../Inputs/RateInput';

const headCells = [
    {
        id: 'rate',
        numeric: false,
        disablePadding: true,
        label: '중요',
        width: 70,
    },
    {
        id: 'number',
        numeric: true,
        disablePadding: false,
        label: '번호',
    },
    {
        id: 'analysis',
        numeric: false,
        disablePadding: false,
        label: '분석결과',
    },
    {
        id: 'deviceId',
        numeric: false,
        disablePadding: false,
        label: '디바이스 ID',
    },
    {
        id: 'fileName',
        numeric: false,
        disablePadding: false,
        label: '파일명',
    },
    {
        id: 'fileSize',
        numeric: false,
        disablePadding: false,
        label: '깃발 크기',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: '등록일자',
    },
];

const radioLabels = [
    { name: '전체' },
    { name: '정상' },
    { name: '오류' }

]

const ratelabels = [
    { name: '전체' },
    { name: <RateInput /> },
    { name: <RateInput /> }
]



export { headCells, radioLabels, ratelabels };