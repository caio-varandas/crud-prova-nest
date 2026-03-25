import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  create(createAddressDto: CreateAddressDto) {
    return this.prisma.address.create({
      data: {
        street: createAddressDto.street,
        number: createAddressDto.number,
        city: createAddressDto.city,
        state: createAddressDto.state,
        zipCode: createAddressDto.zipCode,
        userId: createAddressDto.userId,
      },
    });
  }

  findAll() {
    return this.prisma.address.findMany({
      include: {
        user: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.address.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  remove(id: string) {
    return this.prisma.address.delete({
      where: { id },
    });
  }
}