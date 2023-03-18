interface MenuItemsInterface {
	label: string;
	value: string;
}
export const MENU_ITEM_STATUS: MenuItemsInterface[] = [
	{ label: "To do", value: "todo" },
	{ label: "In Review", value: "in-review" },
	{ label: "Done", value: "done" },
];
