import { useEffect } from 'react';

const useCastSender = ({appId}) => {
  useEffect(() => {
    window.cast.framework.CastContext.getInstance().setOptions({
      receiverApplicationId: appId,
      autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    })
  }, []);
}

const useCastReciever = () => {
  useEffect(() => {
    const context = window.cast.framework.CastReceiverContext.getInstance();
    const options = new window.cast.framework.CastReceiverOptions();
    options.disableIdleTimeout = true;
    context.start(options);
    if (process.env.NODE_ENV === 'development') context.setLoggerLevel(window.cast.framework.LoggerLevel.DEBUG);
  }, []);
}

export {
  useCastSender,
  useCastReciever
}
