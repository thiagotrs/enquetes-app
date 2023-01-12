import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
  });

  describe('getDocs', () => {
    it('should return api url redirection', () => {
      const appController = app.get(AppController);
      expect(appController.getDocs()).toEqual({ url: '/api' });
    });
  });
});
