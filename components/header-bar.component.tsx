'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import Link from "next/link";
import { HeaderNavigation } from "./header-navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { authState } from "@/states/auth";
import { AccountApi } from "@/app/api/account.api";
import { useEffect } from "react";

export const HeaderBar = () => {
    const { push } = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const [auth, setAuth] = useRecoilState(authState);

    const loadAuth = async () => {
      const accessToken = await AccountApi.getAccessToken(params.get('tempToken'));
      setAuth({
        isLoggedIn: accessToken != null,
        token: accessToken,
      });
      if (params.get('tempToken')) {
        push(pathname);
        location.href = 'https://kyonggiti.me';
      }
    }

    useEffect(() => {
      loadAuth();
    }, []);

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