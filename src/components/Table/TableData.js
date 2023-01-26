import RateInput from '../Inputs/RateInput';

const headCells = [
    // {
    //     id: 'rate',
    //     numeric: false,
    //     disablePadding: true,
    //     label: '중요',
    //     width: 70,
    // },
    {
        id: 'number',
        numeric: true,
        disablePadding: false,
        label: '번호',
    },
    // {
    //     id: 'analysis',
    //     numeric: false,
    //     disablePadding: false,
    //     label: '분석결과',
    // },
    // {
    //     id: 'deviceId',
    //     numeric: false,
    //     disablePadding: false,
    //     label: '디바이스 ID',
    // },    
    {
        id: 'fileName',
        numeric: false,
        disablePadding: false,
        label: '파일명',
    },
    {
        id: 'golf_field',
        numeric: false,
        disablePadding: false,
        label: '골프장'
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
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
];

const radioLabels = [
    { id: 1, value: 'all', label: '전체' },
    { id: 2, value: 'normal', label: '정상' },
    { id: 3, value: 'error', label: '오류' }

]

const ratelabels = [
    { id: 1, value: 'all', label: '전체' },
    { id: 2, value: 'high', label: <RateInput val='1' /> },
    { id: 3, value: 'low', label: <RateInput val='null' /> }
]



export { headCells, radioLabels, ratelabels };