import { response } from "express";
import { UserLoginTime } from "../models/UserLoginTime.model";

export const registerLog = async (req, res = response) => {
   const { logs, ...rest } = req.body;
   try {
      let user_login = await UserLoginTime.findOne({
         user_id_app: req.body["user_id_app"],
      });
      if (!user_login) {
         user_login = new UserLoginTime(rest);
      }

      logs.forEach((log) => {
         const timeStart = new Date(log["timeStart"]);
         const timeEnd = new Date(log["timeEnd"]);
         user_login.get("logs").push({
            timeStart,
            timeEnd,
         });
      });

      await user_login.save();

      return res.json({
         msg: "Logs registrado Correctamente",
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Error en el servidor",
      });
   }
};

export const getLogs = async (req, res = response) => {
   const { start, end } = req.body;
   try {
      const timeStart = new Date(start);
      const timeEnd = new Date(end);

      const logs = await UserLoginTime.aggregate([
         {
            $project: {
               logs: {
                  $filter: {
                     input: "$logs",
                     as: "log",
                     cond: {
                        $and: [
                           { $gte: ["$$log.timeStart", timeStart] },
                           { $lte: ["$$log.timeStart", timeEnd] },
                        ],
                     },
                  },
               },
            },
         },
      ]);

      return res.json({
         data: logs,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Error en el servidor",
      });
   }
};
