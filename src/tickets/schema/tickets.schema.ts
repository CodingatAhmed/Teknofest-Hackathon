// src/tickets/schemas/ticket.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Ticket extends Document {
  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['Technical', 'Billing', 'General'] })
  category: string;

  @Prop({ required: true, enum: ['Low', 'Medium', 'High'] })
  priority: string;

  @Prop({ default: 'Open', enum: ['Open', 'In Progress', 'Resolved'] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);