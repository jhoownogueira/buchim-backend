export abstract class IPostRepository {
  abstract create(data: any): Promise<void>;
}
