import React from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "antd";
const { SubMenu, Item } = Menu;

const NavigationOptions = (props) => {
	const { items, location } = props;

	return (
		<div
			style={{
				flex: "1 1 0%",
				overflow: "hidden auto",
			}}
		>
			<Menu
				mode="inline"
				// defaultSelectedKeys={["/"]}
				// selectedKeys={[location.pathname]}
			>
				{items.map((item, index) => {
					if (item.children && item.children.length > 0) {
						return (
							<>
								<SubMenu key={`sub${index}`} icon={item.icon} title={item.label}>
									{item.children.map((subItem, idx) => {
										return (
											<>
												<Item key={subItem.link}>
													<NavLink to={subItem.link}>{subItem.label}</NavLink>
												</Item>
											</>
										);
									})}
								</SubMenu>
							</>
						);
					}

					return (
						<>
							<Item key={item.link} icon={item.icon}>
								<NavLink to={item.link}>{item.label}</NavLink>
							</Item>
						</>
					);
				})}
			</Menu>
		</div>
	);
};

export default NavigationOptions;
