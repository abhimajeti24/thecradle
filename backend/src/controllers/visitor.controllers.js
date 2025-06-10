import Visitor from "../models/visitor.model.js";

export const trackVisit = async (req, res) => {
  try {
    await Visitor.create({});
    res.status(201).json({ message: "Visit recorded" });
  } catch (err) {
    res.status(500).json({ error: "Failed to track visit" });
  }
};

export const getWeeklyVisits = async (req, res) => {
  const start = new Date();
  start.setDate(start.getDate() - start.getDay()); 
  const end = new Date();
  end.setDate(start.getDate() + 6); 

  const result = await Visitor.aggregate([
    {
      $match: {
        visitedAt: {
          $gte: new Date(start.setHours(0, 0, 0, 0)),
          $lte: new Date(end.setHours(23, 59, 59, 999)),
        },
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: "$visitedAt" }, 
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id": 1 },
    },
  ]);

  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const data = new Array(7).fill(0);
  result.forEach((r) => {
    data[r._id - 1] = r.count;
  });

  res.json({ labels, data });
};

export const getMonthlyVisits = async (req, res) => {
  const currentYear = new Date().getFullYear();

  const result = await Visitor.aggregate([
    {
      $match: {
        visitedAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$visitedAt" }, // 1 = Jan
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  const labels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const data = new Array(12).fill(0);
  result.forEach((r) => {
    data[r._id - 1] = r.count;
  });

  res.json({ labels, data });
};

export const getYearlyVisits = async (req, res) => {
  const result = await Visitor.aggregate([
    {
      $match: {
        visitedAt: {
          $gte: new Date("2025-01-01"),
        },
      },
    },
    {
      $group: {
        _id: { $year: "$visitedAt" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  const labels = result.map((r) => r._id.toString());
  const data = result.map((r) => r.count);

  res.json({ labels, data });
};
