const KANJI_DIGITS = "〇一二三四五六七八九";
const SMALL_UNITS = ["", "十", "百", "千"];
const LARGE_UNITS = ["", "万", "億", "兆", "京"];

export function formatRecordNumber(value: string | undefined): string | undefined {
	const digits = value?.trim().replace(/^0+/, "");
	if (!digits || !/^[1-9][0-9]*$/.test(digits)) return undefined;

	// Keep unusually long legacy numbers readable without losing precision.
	if (digits.length > LARGE_UNITS.length * 4) {
		return `第${digits.replace(/[0-9]/g, (digit) => KANJI_DIGITS[Number(digit)])}篇`;
	}

	const numeral = digits.replace(/[0-9]{1,4}(?=(?:[0-9]{4})*$)/g, (group, offset: number) => {
		const groupNumeral = [...group].map((digit, index) => {
			if (digit === "0") return "";
			const unit = SMALL_UNITS[group.length - index - 1];
			return (digit === "1" && unit ? "" : KANJI_DIGITS[Number(digit)]) + unit;
		}).join("");
		const unit = LARGE_UNITS[(digits.length - offset - group.length) / 4];
		return groupNumeral ? groupNumeral + unit : "";
	});

	return `第${numeral}篇`;
}
