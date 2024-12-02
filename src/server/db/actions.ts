"use server";
import { redirect } from "next/navigation";
import { db } from ".";
import { leagues } from "./schema";

export const addLeague = async (data: { name: string }) => {
  console.log(data, " - addLeague");
  //TODO: Validate values

  await db.insert(leagues).values({ name: data.name });

  redirect("/league");
};
