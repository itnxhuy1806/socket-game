import { RoomData } from "@/types";
import { List, ListItem, ListSubheader } from "@mui/material";
import { FC } from "react";

interface IListUserProps {
  users: RoomData["hasagi"]["users"];
}
export const ListUser: FC<IListUserProps> = ({ users }) => {
  if (!users?.length) return null;
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          User
        </ListSubheader>
      }
    >
      {users.map(({ name, isHost, online }) => (
        <ListItem key={name}>{`${name} ${isHost ? "(host)" : ""} ${online ? "on" : "off"}`}</ListItem>
      ))}
    </List>
  );
};
