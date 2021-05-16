import { I_FormatMoney } from "./I_FormatMoney"

class FormatMoney implements I_FormatMoney {

    presenter(value: number): string {
        return `R$ ${(value/100).toFixed(2).replace('.', ',')}`
    }

    formatter(value: number): number {
        return parseInt(value.toFixed(2).replace('.', ''))
    }

}

export default new FormatMoney()