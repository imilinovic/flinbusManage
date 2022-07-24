/**
 * Pomoćna klasa koja enkapsulira parametre koje šalje korisnik. Instanca ove klase mora se proslijediti
 * kao lokalni parametar u .ejs datoteku pod ključem 'helper':
 * https://expressjs.com/en/4x/api.html#res
 *
 * ```
 * res.render('example', {
 *         ...
 *         helper: new Helper(parameters)
 *     });
 * });
 * ```
 *
 * Vaš zadatak je implementirati metode koje nisu implementirane unutar ove klase.
 * Nakon što se metode implementiraju, .ejs datoteka će se ispravno prikazati.
 * @type {Helper}
 */
module.exports = class Helper {

    constructor(params) {
        this.params = params;
    }

    /**
     * Metoda vraća polje mogućih vrijednosti za input
     * 'Which part of the web shop do you think could be improved?'
     * @returns {string[]}
     */
    improvements() {
        // ZADATAK
        return ['No improvements necessary', 'User interface', 'Checkout process']
    }

    /**
     * Za proslijeđeni parametar 'val', ova metoda vraća string 'selected' ako se 'val'
     * podudara s opcijom koju je korisnik odabrao za input
     * 'Which part of the web shop do you think could be improved?'
     * , a inače vraća undefined.
     *
     * @param val input
     * @returns {string} 'selected' ili undefined
     */
    isImprovementSelected(val) {
        if(this.params && val == this.params.improvements)
            return 'selected'
        return undefined
    }


    /**
     * Metoda vraća niz koji je korisnik proslijedio za input
     * 'If you think improvements are possible, what would you do differently?'
     * ili prazan string.
     * @returns {string|*}
     */
    improvementText() {
        // ZADATAK
        if(this.params && this.params['improvement-text'])
            return this.params['improvement-text']
        return ''
    }


    /**
     * Metoda vraća polje mogućih vrijednosti za input
     * 'How likely are you to recommend our shop to a friend?'
     * @returns {string[]}
     */
    recommendationValues() {
        // ZADATAK
        return ['1', '2', '3', '4', '5']
    }

    /**
     * Za proslijeđeni parametar 'val', ova metoda vraća string 'checked' ako se 'val'
     * podudara s opcijom koju je korisnik odabrao za input
     * 'How likely are you to recommend our shop to a friend?'
     * ,a inače vraća undefined.
     *
     * @param val input
     * @returns {string} 'checked' ili undefined
     */
    isRecommendationSelected(val) {
        // ZADATAK
        if(this.params && val == this.params['recommendation-grade'])
            return 'checked'
        return undefined
    }

    /**
     * Metoda zamjenjuje znak razmaka ' ' u nizu sa '-' i pretvara string u mala slova
     * @param val input
     * @returns {string}
     */
    stringToHTMLId(val) {
        // NE TREBA implementirati
        return String(val).split(' ').join('-').toLowerCase();
    }

}
