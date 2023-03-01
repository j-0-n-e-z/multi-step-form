export function breakCamelCase(str: string): string {
	return str.replace(/[A-Z]/, m => ' ' + m.toUpperCase())
}