import * as React from 'react'
import className from 'classnames'
import {useSelector, useDispatch} from 'react-redux'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {useRouter} from 'next/router'

import {_t} from '@lib/helpers'
import {alertRemove, RootState} from '@lib/store'

const Alert = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state: RootState) => state.alert)

  const router = useRouter()
  const t = _t(router.locale)

  return (
    <TransitionGroup className='Alert' appear>
      {alert?.map?.((x) => (
        <CSSTransition
          key={x.dateKey}
          className={className('Alert__item', {
            'Alert__item--red': x.type == 'red',
          })}
          timeout={{
            appear: 1000,
            enter: 1000,
            exit: 400,
          }}
        >
          <div
            onMouseEnter={() => {
              window.clearTimeout(x.timeoutID)
            }}
            onMouseLeave={() => {
              window.setTimeout(() => {
                dispatch(alertRemove(x.dateKey))
              }, 2000)
            }}
          >
            <div className='Alert__item__wrapper'>
              <p className='Alert__item__p'>
                {x.p
                  ? x.p
                  : x.type == 'red'
                  ? t('components.Alert.fail.p')
                  : t('components.Alert.success.p')}
              </p>

              {x.small && (
                <small className='Alert__item__small'>
                  {x.small
                    ? x.small
                    : x.type == 'red'
                    ? t('components.Alert.fail.small')
                    : t('components.Alert.success.small')}
                </small>
              )}
            </div>

            <a
              className='Alert__item__close'
              onClick={() => {
                dispatch(alertRemove(x.dateKey))
              }}
            >
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M11.6777 13.0919C12.0682 13.4824 12.7014 13.4824 13.0919 13.0919C13.4824 12.7013 13.4824 12.0682 13.0919 11.6777L8.14214 6.72791L13.0919 1.77816C13.4824 1.38763 13.4824 0.754469 13.0919 0.363944C12.7014 -0.0265802 12.0682 -0.0265796 11.6777 0.363944L6.72792 5.31369L1.77817 0.363944C1.38765 -0.0265799 0.754486 -0.0265802 0.363961 0.363944C-0.0265637 0.754469 -0.026563 1.38763 0.363961 1.77816L5.31371 6.72791L0.363961 11.6777C-0.0265633 12.0682 -0.0265637 12.7013 0.363961 13.0919C0.754486 13.4824 1.38765 13.4824 1.77817 13.0919L6.72792 8.14212L11.6777 13.0919Z'
                />
              </svg>
            </a>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default Alert
