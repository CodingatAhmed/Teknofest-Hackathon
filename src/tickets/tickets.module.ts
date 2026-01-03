// src/tickets/tickets.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket, TicketSchema } from './schema/tickets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService], // Export if you need it in other modules
})
export class TicketsModule {}