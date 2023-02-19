import * as React from 'react';
import Paper from '@mui/material/Paper';
import PieChart, {    
    Export,
    Series,
    Label,
    Font,
    Connector,
} from 'devextreme-react/pie-chart';
import { client } from '../../routes/routes';


export default function Stats() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        client.get('getstats').then((response) => {
            setData(response.data)
        })
    }, []);

    function customizeText(arg) {
        return `${arg.argumentText} (${arg.percentText})`;
    }

    return (
        <Paper elevation={0}>
            <PieChart id="pie"
                palette="Bright"
                dataSource={data}
                title="Superfinder model performance in 2023"
            >
                <Export enabled={true} />
                <Series argumentField="item" valueField="num">
                    <Label
                        visible={true}
                        position="columns"
                        customizeText={customizeText}>
                        <Font size={16} />
                        <Connector visible={true} width={0.5} />
                    </Label>
                </Series>
            </PieChart>
        </Paper>

    );
}
