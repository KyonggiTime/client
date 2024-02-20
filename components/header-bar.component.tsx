'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import Link from "next/link";
import { HeaderNavigation } from "./header-navigation";

export const HeaderBar = () => {
    return (
      <Navbar className="shadow-md">
        <NavbarBrand className="cursor-pointer">
          <p className="font-bold text-inherit pointer-events-none select-none">경기타임</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 select-none" justify="center">
          <NavbarItem>
            <HeaderNavigation />
          </NavbarItem>
        </NavbarContent>
          <NavbarContent className="sm:hidden" justify="end">
            <NavbarMenuToggle />
          </NavbarContent>
          <NavbarMenu>
            <HeaderNavigation />
          </NavbarMenu>
      </Navbar>
    );
}