import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

function PdfCustom({ headers, rows, numero, theader }) {
    const theme = useTheme();
    return (
        <table className="printTable">
            {headers ? (
                <thead>
                    <tr
                        style={{
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.common.black
                        }}
                    >
                        {headers.map((item, index) => {
                            const hd = item.toString().split('#');

                            return headers.length - 1 === index ? (
                                <th align={hd?.[1]} key={`${index}${hd?.[0]}`} style={{ padding: 2 }}>
                                    {hd?.[0]}
                                </th>
                            ) : (
                                <th key={`${index}${hd?.[0]}`} style={{ padding: 2 }}>
                                    {item}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
            ) : (
                theader
            )}
            <tbody>
                {rows.length !== 0 &&
                    rows.map((row, index) => (
                        <tr key={index}>
                            {Object.keys(row).map((key, ind) => {
                                const isReactElement = String(row[key]?.$$typeof).includes('Symbol(react.element)');
                                const temp = row[key]?.toString().split('#');
                                const alignment = Object.keys(row).length - 1 === ind ? 'right' : 'left';

                                // let alignment;
                                // if (ind === 0) alignment = 'left';
                                // else if (Object.keys(row).length - 1 === ind) alignment = 'right';
                                // else alignment = 'left';

                                if (isReactElement) {
                                    return (
                                        <td key={`${ind}${key}`} align="center" style={{ padding: 2 }}>
                                            {row[key]}
                                        </td>
                                    );
                                }

                                return numero && ind === 0 ? (
                                    <td key={ind} align={alignment} style={{ padding: 2 }}>
                                        {index + 1}
                                    </td>
                                ) : (
                                    ind !== 0 && (
                                        <td key={ind} align={temp?.[1]} style={{ padding: 2 }}>
                                            {temp?.[0]}
                                        </td>
                                    )
                                );
                            })}
                        </tr>
                    ))}
            </tbody>
            {/* <tfoot>
                    <tr>
                         <td colSpan={headers.length}>footer</td>
                    </tr>
               </tfoot> */}
        </table>
    );
}

PdfCustom.propTypes = {
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    theader: PropTypes.func,
    numero: PropTypes.bool
};

export default PdfCustom;
