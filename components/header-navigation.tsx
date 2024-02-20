'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import Link from "next/link";

export const HeaderNavigation = () => {
    return (
      <>
        <Link className="font-bold text-sm mr-6" color="foreground" href="/">
            시간표
        </Link>
        <Link className="font-bold text-sm" color="foreground" href="/notice">
            공지사항
        </Link>
      </>
    );
}