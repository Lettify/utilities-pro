import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createPaymentMethod,
  deletePaymentMethod,
  listPaymentMethods,
  setDefaultPaymentMethod,
  updatePaymentMethod,
} from "../db";
import { protectedProcedure, router } from "../_core/trpc";

const paymentMethodSchema = z.object({
  brand: z.string().min(2).max(50),
  cardholder: z.string().min(2).max(120),
  last4: z.string().length(4),
  expMonth: z.string().min(2).max(2),
  expYear: z.string().min(4).max(4),
  isDefault: z.boolean().optional(),
});

const paymentMethodUpdateSchema = z.object({
  id: z.number().int().positive(),
  brand: z.string().min(2).max(50).optional(),
  cardholder: z.string().min(2).max(120).optional(),
  expMonth: z.string().min(2).max(2).optional(),
  expYear: z.string().min(4).max(4).optional(),
  isDefault: z.boolean().optional(),
});

export const paymentMethodsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return listPaymentMethods(ctx.user.id);
  }),

  create: protectedProcedure
    .input(paymentMethodSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await createPaymentMethod(ctx.user.id, input);
      return { success: true } as const;
    }),

  update: protectedProcedure
    .input(paymentMethodUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const { id, ...updates } = input;
      await updatePaymentMethod(ctx.user.id, id, updates);
      return { success: true } as const;
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await deletePaymentMethod(ctx.user.id, input.id);
      return { success: true } as const;
    }),

  setDefault: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await setDefaultPaymentMethod(ctx.user.id, input.id);
      return { success: true } as const;
    }),
});
