
    /**
     * #################
     * ## CONVERTENDO ##
     * ##    DATAS    ##
     * #################
     */



export function dataTimeToString( date ) {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: 'numeric',
        minute: 'numeric',
    }

    const locale = "pt-br"

    return date.toLocaleDateString(locale, options)
}

export function stringToDataTime( arg ) {

    const re = /[-:/ ]/
    const [ dd, MM, yyyy, hh, mm ]  = arg.split(re);

    console.log(dd, MM, yyyy, hh, mm )
    return new Date( yyyy, MM - 1, dd, hh, mm );

}


export function dateAfter ( arg ) {
    if( arg > Date.now()){
        return true;
    }

    return false;
}

