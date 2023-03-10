const { useIntl } = require('react-intl');

export function FormatDate(date) {
    const intl = useIntl();
    return date
        .toLocaleDateString(intl.locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        .replace(/\//g, '-')
        .replace(/,/, '');
}

export function FormatDateTime(date) {
    const intl = useIntl();
    return date
        .toLocaleDateString(intl.locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
        .replace(/\//g, '-')
        .replace(/,/, '');
}
