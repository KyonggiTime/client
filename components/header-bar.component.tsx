'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import Link from "next/link";
import { HeaderNavigation } from "./header-navigation";
import { useRouter } from "next/navigation";

export const HeaderBar = () => {
    const { push } = useRouter();

    return (
      <Navbar className="shadow-md">
        <NavbarBrand className="cursor-pointer" onClick={() => push('/')}>
          <p className="font-bold text-inherit pointer-events-none select-none">
            <Link className="font-bold text-md" color="foreground" href="/">
                경기타임
            </Link>
          </p>
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