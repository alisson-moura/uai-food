interface I_FormatMoney {
    presenter(value: number): string
    formatter(value: number): number
}

export {I_FormatMoney}