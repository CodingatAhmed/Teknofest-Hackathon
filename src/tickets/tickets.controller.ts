/* eslint-disable prettier/prettier */
import { 
  Controller, Get, Post, Patch, Delete, 
  Body, Param, UseGuards, Request 
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/auth.guard'; // Ensure this matches your finalized guard file

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() dto: any, @Request() req) {
    // req.user.userId is extracted from the JWT payload
    return this.ticketsService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.ticketsService.findAll(req.user.userId);
  }

  @Get('stats')
  getStats(@Request() req) {
    return this.ticketsService.getStats(req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any, @Request() req) {
    return this.ticketsService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.ticketsService.remove(id, req.user.userId);
  }
}