/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket } from './schema/tickets.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
  ) {}

  // Creates a ticket and links it to the authenticated user
  async create(dto: any, userId: string): Promise<Ticket> {
    const newTicket = new this.ticketModel({
      ...dto,
      userId: new Types.ObjectId(userId),
    });
    return newTicket.save();
  }

  // Returns only the tickets belonging to the logged-in user
  async findAll(userId: string): Promise<Ticket[]> {
    return this.ticketModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  // Updates a ticket only if it belongs to the requesting user
  async update(id: string, userId: string, dto: any): Promise<Ticket> {
    const ticket = await this.ticketModel.findOneAndUpdate(
      { _id: id, userId }, 
      dto,
      { new: true },
    );
    if (!ticket) throw new NotFoundException('Ticket not found or unauthorized');
    return ticket;
  }

  // Deletes a ticket owned by the user
  async remove(id: string, userId: string) {
    const result = await this.ticketModel.deleteOne({ _id: id, userId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException('Ticket not found');
    return { message: 'Ticket deleted successfully' };
  }

  // Calculates counts for the dashboard statistics header
  async getStats(userId: string) {
    const tickets = await this.ticketModel.find({ userId });
    return {
      open: tickets.filter((t) => t.status === 'Open').length,
      inProgress: tickets.filter((t) => t.status === 'In Progress').length,
      resolved: tickets.filter((t) => t.status === 'Resolved').length,
      total: tickets.length,
    };
  }
}