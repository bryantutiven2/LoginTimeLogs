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

export const getUserToApp = async (req, res = response) => {
   const { ruc } = req.body;
   try {
      const resp = await UserLoginTime.find({ ruc_app: ruc }, [
         "user_name_app",
         "user_email_app",
         "user_id_app",
      ]);
      return res.json(resp);
   } catch (error) {
      return res.status(500).json({
         msg: "Error en el servidor",
      });
   }
};

export const getLogs = async (req, res = response) => {
   const { user_id, start, end } = req.body;
   try {
      const timeStart = new Date(start * 1000);
      const timeEnd = new Date(end * 1000);

      const logsObject = await UserLoginTime.aggregate([
         { $match: { user_id_app: user_id } },
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

      let times = [];
      logsObject[0].logs.forEach((log) => {
         const miliseconds = log.timeEnd - log.timeStart;
         times.push(miliseconds);
      });

      return res.json({
         logs: times,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Error en el servidor",
      });
   }
};
