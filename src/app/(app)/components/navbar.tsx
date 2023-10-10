"use client";
import React, { useState, Suspense } from "react";
import { BiHomeAlt } from "react-icons/bi";
import LinkCustom from "./link";
import ButtonModal from "./btn-modal";
import ButtonSearch from "./btn-search";
import BtnNotification from "./btn-notification";
import Notification from "./notification";
import { User } from "@/app/types/user";
import BtnMenu from "./btn-menu";
const NavBar = ({ user, num_noti }: { user: User; num_noti: number }) => {
  const [showNoti, setNotiShow] = useState(false);

  return (
    <div className="fixed bottom-0 z-40 md:left-0 md:top-0 w-full md:w-auto rounded-t-[30px] md:rounded-none bg-white dark:bg-black dark:text-white">
      <div className="relative md:h-full">
        <div className="flex justify-between md:h-full relative">
          <div className="w-full h-full md:w-auto md:flex md:flex-col md:justify-between md:items-center md:p-4 p-1 md:border-r-2 md:border-gray-300">
            <nav>
              <ul className="flex md:flex-col md:gap-6 justify-between items-center ">
                <li className="text-3xl">
                  <LinkCustom href="/">
                    <BiHomeAlt />
                  </LinkCustom>
                </li>
                <li className="text-3xl">
                  <ButtonModal />
                </li>
                <li className="text-3xl">
                  <ButtonSearch />
                </li>
                <li className="hidden md:block">
                  <BtnNotification
                    onShow={() => setNotiShow(!showNoti)}
                    noti={num_noti}
                    user_id={user?.id}
                  />
                </li>
                <li className="text-3xl">
                  <Suspense fallback={<div>loading...</div>}>
                    {user ? (
                      <LinkCustom href={"/" + user.id}>
                        <img
                          className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                          src={user?.avatar_url ? user.avatar_url : ""}
                          alt=""
                          width={6}
                          height={6}
                        />
                      </LinkCustom>
                    ) : null}
                  </Suspense>
                </li>
              </ul>
            </nav>

            <BtnMenu />
          </div>
          {showNoti && (
            <div className="hidden md:block absolute left-[70px] transition ease-in-out delay-150 translate-x-[0%]">
              <div className="min-w-[340px]">
                <Notification />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
