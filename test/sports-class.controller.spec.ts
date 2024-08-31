import { SportsClassController } from '../src/sports-class/sports-class.controller';
import { SportsClassService } from '../src/sports-class/sports-class.service';
import { SportsClass } from '../src/sports-class/sports-class.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

/*
TODO Check how to better pass expected results to the test itself
 */
const results: SportsClass[] = [
  {
    id: Math.floor(Math.random() * 1000),
    name: randomStringGenerator(),
    classDuration: randomStringGenerator(),
    weekSchedule: randomStringGenerator(),
    description: randomStringGenerator(),
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: randomStringGenerator(),
    classDuration: randomStringGenerator(),
    weekSchedule: randomStringGenerator(),
    description: randomStringGenerator(),
  },
];

describe('SportsClassController', () => {
  let controller: SportsClassController;
  let service: jest.Mocked<SportsClassService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SportsClassController],
    })
      .useMocker((token) => {
        if (token === SportsClassService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);

          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get(SportsClassController);
    service = moduleRef.get(SportsClassService);
  });

  describe('findAll()', () => {
    it('should return array of sports classes', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => new Promise((resolve) => resolve(results)));

      expect(await controller.findAll()).toEqual(results);
    });
  });
});
