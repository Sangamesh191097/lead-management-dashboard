import { Request, Response, NextFunction } from "express";
import {
  createLeadService,
  deleteLeadService,
  getLeadsService,
  updateLeadService,
} from "../services/lead.service";
import { getDashboardStats } from "../services/externalApi.service";

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const createLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const lead = await createLeadService(req.body, req.user!.userId);

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search as string;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const leads = await getLeadsService(search, page, limit);

    res.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lead = await updateLeadService(req.params.id as string, req.body);

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteLeadService(req.params.id as string);

    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const dashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await getDashboardStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};