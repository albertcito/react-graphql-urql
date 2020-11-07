export enum RouteTypeEnum {
  private = 'private',
  public = 'public',
  session= 'session',
}

export const isPrivate = (routeType: RouteTypeEnum): boolean => (routeType === RouteTypeEnum.private);
export const isSession = (routeType: RouteTypeEnum): boolean => (routeType === RouteTypeEnum.session);
export const isPublic = (routeType: RouteTypeEnum): boolean => (routeType === RouteTypeEnum.public);
