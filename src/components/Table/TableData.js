import RateInput from '../Inputs/RateInput';


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



export { radioLabels, ratelabels };