"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  LogOut,
  AlignJustify,
  ChartColumnBig,
  UsersRound,
  BadgeDollarSign,
  BaggageClaim,
  PackageOpen,
} from "lucide-react";

import Image from "next/image";

import { usePathname } from "next/navigation";
import Drawer from "../(components)/modals/drawer";
import { useAuth } from "../context";
import { useRouter } from "next/navigation";
import Logo from "../../public/logo.jpeg";

interface IProp {
  children: React.ReactNode;
}

interface NavLinkProps {
  href: string;
  icon: any;
  children: React.ReactNode;
}

export const MainLayout = ({ children }: IProp) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  const SignOut = async () => {
    await signOut().then(() => {
      router.push("/auth");
    });
  };

  const urlPath = usePathname();
  const NavLink = ({ href, icon: Icon, children }: NavLinkProps) => {
    const isActive = urlPath === href;

    return (
      <Link
        href={href}
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground ${
          isActive ? "bg-slate-300 text-white" : ""
        }`}
      >
        {Icon && <Icon className="h-5 w-5" />}{" "}
        {/* Render the icon if provided */}
        {children}
      </Link>
    );
  };

  const MenuList = () => {
    return (
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <NavLink href="/admin" icon={LayoutDashboard}>
          Dashboard
        </NavLink>

        <NavLink href="/admin/product" icon={PackageOpen}>
          Product
        </NavLink>
        <NavLink href="/admin/order" icon={BaggageClaim}>
          Order
        </NavLink>

        <NavLink href="/admin/payment" icon={BadgeDollarSign}>
          Payment
        </NavLink>

        <NavLink href="/admin/analyses" icon={ChartColumnBig}>
          Anaylises
        </NavLink>

        <NavLink href="/admin/customer" icon={UsersRound}>
          Customer
        </NavLink>
      </nav>
    );
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr]  ">
      <div className="hidden border-r bg-muted/40 md:block ">
        <div className="flex h-full max-h-screen flex-col gap-2 mb-5 ">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-customPrimary">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="flex gap-4 items-center">
                <div className="">
                  <Image src={Logo} alt="logo" width={30} height={30} />
                </div>
                <div>
                  <h4 className="text-customSecondary">Cycle Surgeon</h4>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex-1">
            <MenuList />
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden">
        <header className="flex justify-between md:justify-end lg:justify-end h-14 items-center gap-4 border-b  px-4 lg:h-[60px] lg:px-6 ">
          <button
            onClick={() => {
              setIsDrawerOpen(true);
            }}
            className="flex md:hidden lg:hidden"
          >
            <AlignJustify />
          </button>

          <button onClick={SignOut}>
            <LogOut />
          </button>
        </header>

        <main className="p-4 overflow-y-auto  flex-1">{children}</main>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="flex-1">
          <MenuList />
        </div>
      </Drawer>
    </div>
  );
};
